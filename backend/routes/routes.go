package routes

import (
	"fmt"
	"patkany/backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine){
	r.POST("/login", func (c *gin.Context){
		controllers.AuthHandler(c, true)
	})
	r.POST("/register", func(c *gin.Context){
		controllers.AuthHandler(c, false)
	})

	r.POST("/review", controllers.CreateReview)

	r.POST("/reservation", controllers.CreateReservation)
	
	getAlls := []string{"reservations", "users", "reviews"}

	for i := 0; i < len(getAlls); i++ {
		item := getAlls[i]
		r.GET(fmt.Sprintf("/getall/%v", item), func(c *gin.Context){
			controllers.GetAll(c, item)
		})
	}

	r.POST("/checkIfAdmin", controllers.CheckIfAdmin)	
	
	r.POST("/delete", controllers.Delete)

}