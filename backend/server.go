package main

import (
	"fmt"
	"patkany/backend/db"
	"patkany/backend/routes"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main(){
	g := gin.Default()

	// g.Use(cors.New(cors.Config{
	// 	AllowOrigins:     []string{"http://localhost:8080"},
	// 	AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
	// 	AllowHeaders:     []string{"Content-Type", "Authorization"},
	// 	AllowCredentials: true,
	// }))

	g.Use(cors.New(cors.Config{
		AllowAllOrigins:  true, // Allow all origins
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false, // Must be false if using "*"
		MaxAge:           12 * time.Hour, // Cache preflight requests
	}))





    
	db.InitDB();
	routes.SetupRoutes(g);


	g.Run(":8081")
	fmt.Println("Server is running on port 8081")
}