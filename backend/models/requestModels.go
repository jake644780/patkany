package models


type UserREQ struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type ReviewREQ struct {
	Review string `json:"review"`
	Rating uint   `json:"rating"`
	UserId uint   `json:"UserId"`
}

type ReservationREQ struct {
	Reserved string `json:"reserved"`
	UserId   uint   `json:"UserId"`
}

type ReservationRES struct {
	Id       uint   `json:"Id"`
	Reserved string `json:"date"`
	UserId   uint   `json:"UserId"`
}

type CheckIfAdminREQ struct {
	Id uint `json:"id"`
}

type DeletionREQ struct {
	Type	string `json:"type"`
	Id		uint `json:"id"`
}