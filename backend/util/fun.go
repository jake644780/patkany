package util

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"strconv"
	"strings"
	"time"

	"patkany/backend/db"
	"patkany/backend/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// FindUser retrieves a user from the database based on the provided request.
//
// It queries the "users" table for a user with the given username using GORM's First() method.
// If a match is found, the user struct is populated; otherwise, it remains empty,
// signaling that no such user exists. Error handling is included to log database issues.
//
// Parameters:
//   - request: A UserREQ struct containing the username, password and potentially an email to search for.
//
// Returns:
//   - A models.User struct, either populated with the user’s data or empty if no match is found.
//
// Errors:
//   - If no user is found, a warning is logged.
//   - If a database error occurs (other than "record not found"), it is logged.
//
// Dependencies:
//   - db.DB.Table().Where().First(): Queries the database for the first matching user.
func FindUserByName(request models.UserREQ) models.User{
	var user models.User
	//.First() doesn't populate user if not found
	if err := db.DB.Table("users").Where("username = ?", request.Username).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Printf("User with username %s not found", request.Username)
		} else {
			log.Printf("Error finding user: %v", err)
		}
	}
	return user
}

func FindUserById(id int) models.User{
	var user models.User
	//.First() doesn't populate user if not found
	if err := db.DB.Table("users").Where("id = ?", id).First(&user).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			log.Printf("User with id %v not found", id)
		} else {
			log.Printf("Error finding user: %v", err)
		}
	}
	return user
}


func JsonBindingWithErrorCheck(c *gin.Context, request any)(state bool){
	if err := c.ShouldBindJSON(request); err != nil {
		log.Println("Error binding request body:", err.Error())
		c.JSON(400, gin.H{"error": err.Error()})
		return false
	}
	return true
}

func JsonRespondWithErrorCheck(c *gin.Context, response any) (state bool){
	jsondata, err := json.Marshal(response)
	if err != nil {
		c.JSON(500, gin.H{"error": "Internal server error during JSON marshalling"})
		return false
	}
	c.Data(200, "application/json", jsondata)
	return true
}

func ValidateUser(c *gin.Context, request *models.UserREQ, user *models.User, isLogin bool) (state bool){
	userExists := user.Username == request.Username
	correctPass := user.Password == request.Password
	emptyUSER := user.Password == "" || user.Username == ""
	emptyREQ := request.Username == "" || request.Password == ""

	if isLogin && correctPass && userExists && !emptyREQ && !emptyUSER{
		return true
	}
	if !isLogin && !emptyREQ && emptyUSER && !userExists{
		newUser := models.User{
			Username: request.Username,
			Password: request.Password,
			Email: request.Email,
		}

		if !InsertWithErrorCheck(c, &newUser){return false}

		var newUserPermission models.PermissionToUser
		var foundUser models.User
		foundUser.Id = 0
		foundUser = FindUserByName(*request)

		if foundUser.Id == 0{
			c.JSON(500, gin.H{"error": "User not found after creation"})
			return false
		}
		 
		newUserPermission.UserId = foundUser.Id
		newUserPermission.PermissionId = 2

		if !InsertWithErrorCheck(c, &newUserPermission){return false}

		*user = newUser
		return true
	}

	*user = models.User{}
	c.JSON(401, gin.H{
		"error": "credentials are faulty",
	})
	return false
}

func InsertWithErrorCheck(c *gin.Context, data any)(state bool){
	// A review mentése az adatbázisba
	log.Printf("%v", data)
	if err := db.DB.Create(data).Error; err != nil {
		c.JSON(500, gin.H{"error": "Could not insert data into db"})
		log.Printf("%v", err)
		return false
	}
	return true

}

func ParseExtendedTime(input string) (time.Time, error) {
	// Always use UTC time zone
	loc := time.UTC
	parts := strings.Split(input, ":")
	log.Printf("inputted: %v\nparts len: %v", input, len(parts))
	if len(parts) != 6 {
		return time.Time{}, errors.New("invalid data")
	}
	var err error
	var times [6]int
	for i := 0; i < 6; i++ {
		times[i], err = strconv.Atoi(parts[i])
		if err != nil {
			return time.Time{}, errors.New("a part of the data is invalid")
		}
	}

	// Construct the time object in UTC
	return time.Date(times[0], time.Month(times[1]), times[2], times[3], times[4], times[5], 0, loc), nil
}



func TimeToString(time time.Time) (string) {
	return fmt.Sprintf("%v:%v:%v:%v:%v:%v", time.Year(), time.Month(), time.Day(), time.Hour(), time.Minute(), time.Second())
}



func DeleteRecord(model interface{}, id uint) error {
	result := db.DB.Delete(model, id)
	if result.RowsAffected == 0 {
		return errors.New("record deletion failed")
	}

	if err := db.DB.First(model, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil
		}
		return err
	}

	return errors.New("record deletion failed")
}
