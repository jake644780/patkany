package main

import (
	"fmt"
	"patkany/backend/routes"
	"patkany/backend/db"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main(){
	g := gin.Default()

	g.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:8080"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))




    
	db.InitDB();
	routes.SetupRoutes(g);


	g.Run(":8081")
	fmt.Println("Server is running on port 8081")
}