package controllers

import (
	"log"
	"patkany/backend/db"
	"patkany/backend/models"
	"patkany/backend/util"

	"github.com/gin-gonic/gin"
)

// AuthHandler handles both login and registration requests.
// It binds the incoming JSON request, retrieves the user,
// processes login/register validation, and responds with the result.
//
// Parameters:
//   - c: Gin context for the HTTP request.
//   - isLogin: A boolean indicating if the request is a login attempt.
//
// This function uses:
//   - JsonBindingWithErrorCheck: Parses and validates the request body.
//   - FindUser: Retrieves the user from the database.
//   - ValidateUser: Handles validation and modifies the user struct accordingly.
//   - JsonRespondWithErrorCheck: Sends the final response.


func AuthHandler(c *gin.Context, isLogin bool) {
	var request models.UserREQ
	if !util.JsonBindingWithErrorCheck(c, &request){return}
	
	user := util.FindUserByName(request)
	
	if !util.ValidateUser(c, &request, &user, isLogin){return}
	
	util.JsonRespondWithErrorCheck(c, &user)
}


func CreateReview(c *gin.Context) {
    
    var reviewREQ models.ReviewREQ
    
    if !util.JsonBindingWithErrorCheck(c, &reviewREQ){return}

    review := &models.Review{
        Review: reviewREQ.Review,
        Rating:  uint(reviewREQ.Rating),
        UserId: uint(reviewREQ.UserId),
    }

	if !util.InsertWithErrorCheck(c, &review){return}

    util.JsonRespondWithErrorCheck(c, &review)
}

func CreateReservation(c *gin.Context){
    
    var reservationREQ models.ReservationREQ

    if !util.JsonBindingWithErrorCheck(c, &reservationREQ){return}
    
    // if user := util.FindUserById(int(reservationREQ.UserId));user.Id == 0{
    //     c.JSON(400, gin.H{"error": "user not found"})
    //     return
    // }

    time, err := util.ParseExtendedTime(reservationREQ.Reserved)
    if err != nil{
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    reservation := &models.Reservation{
        UserId: reservationREQ.UserId,
        Reserved: time,
    }

    if !util.InsertWithErrorCheck(c, &reservation){return}

    reservationRES := &models.ReservationRES{
        UserId: reservation.UserId,
        Reserved: util.TimeToString(reservation.Reserved),
    }
    util.JsonRespondWithErrorCheck(c, &reservationRES)
}


func GetAll(c *gin.Context, tableName string) {
	// Dynamically determine the struct type based on tableName
	var result interface{}

	// Create a map or slice to hold the result
	// Example: Use a generic slice of maps for dynamic tables
	if tableName == "users" {
		var users []models.User
		result = &users
	} else if tableName == "reservations" {
		var posts []models.Reservation
		result = &posts
	} else if tableName == "reviews" {
		var posts []models.Review
		result = &posts
	} else {
		// If table is unknown, return an error
		c.JSON(400, gin.H{"error": "Invalid table name"})
		return
	}

	// Fetch all rows from the table dynamically
	if err := db.DB.Table(tableName).Find(result).Error; err != nil {
		log.Printf("Error retrieving data from %s table: %v", tableName, err)
		c.JSON(500, gin.H{"error": "Failed to retrieve data"})
		return
	}

	// Use your helper function to return the data
	success := util.JsonRespondWithErrorCheck(c, result)
	if !success {
		log.Println("Error responding with JSON")
	}

}

func CheckIfAdmin(c *gin.Context){
	var checkIfAdminREQ models.CheckIfAdminREQ

	if !util.JsonBindingWithErrorCheck(c, &checkIfAdminREQ){return}

	foundPermission := models.PermissionToUser{
		UserId: 0,
		PermissionId: 0, 
	} 
	
	result := db.DB.Where("user_id = ?", checkIfAdminREQ.Id).First(&foundPermission);


		log.Printf("%v", result)

	if foundPermission.UserId == 0 || foundPermission.PermissionId == 0{
		c.JSON(400, gin.H{
			"error": "couldn't find user in permissions",
		})
	}

	util.JsonRespondWithErrorCheck(c,&foundPermission)
}

func Delete(c *gin.Context){
	var pointer interface{}
	var deletionREQ models.DeletionREQ
	if !util.JsonBindingWithErrorCheck(c, &deletionREQ){return}
	if deletionREQ.Type == "user"{
		pointer = &models.User{}
	}else if deletionREQ.Type == "review"{
		pointer = &models.Review{}
	}else if deletionREQ.Type == "reservation"{
		pointer = &models.Reservation{}
	}


	if err := util.DeleteRecord(pointer, deletionREQ.Id); err != nil{
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(200, gin.H{})
}