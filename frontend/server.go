package main

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func main() {
	g := gin.Default()
	
	g.LoadHTMLGlob("./frontend/html/*.html")
	g.Static("templates", "./frontend/html/templates")
	g.Static("./js", "./frontend/js")
	g.Static("./css", "./frontend/css")
	g.Static("./images", "./frontend/images")
	g.StaticFile("/favicon.ico", "./frontend/images/favicon.ico")
	
	g.GET("/u2qyglli4aaswlplqbln4trtcpzoj73mt4c9wb6ridaaeqd9xzeb1jhu71w6otu3gbb5no195k55n0q2z67yypprir7k42mobetb", func(c *gin.Context) {
		c.HTML(200, "admin.html", "");
	})
	g.GET("/", func(c *gin.Context){
		c.HTML(200, "index.html", "")
	})
	g.Run(":8080")
	fmt.Println("Server is running on port 8080");
}