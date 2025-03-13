// package models

// import "time"

// type User struct {
//     Id       uint   `json:"id" gorm:"primaryKey"`
//     Username string `json:"username" gorm:"type:varchar(255);not null;unique"`
//     Email    string `json:"email" gorm:"type:varchar(255);not null;unique"`
//     Password string `json:"password" gorm:"type:varchar(255);not null"`
// }

// type Permission struct {
//     Id   uint   `json:"id" gorm:"primaryKey"`
//     Name string `json:"name" gorm:"type:varchar(255);not null;unique"`
// }

// type PermissionToUser struct {
//     UserId      uint `json:"user_id" gorm:"primaryKey"`
//     PermissionId uint `json:"permission_id" gorm:"primaryKey"`
// }

// type Review struct {
//     Id      uint   `json:"id" gorm:"primaryKey"`
//     UserId  uint   `json:"user_id" gorm:"type:int;not null"`
//     Rating  uint   `json:"rating" gorm:"type:int;not null"`
//     Review  string `json:"review" gorm:"type:text"`
// }

// type Reservation struct {
//     Id       uint      `json:"id" gorm:"primaryKey"`
//     UserId   uint      `json:"user_id" gorm:"type:int;not null"`
//     Reserved time.Time `json:"reserved" gorm:"type:datetime;not null"`
// }



package models

import "time"

type User struct {
    Id           uint          `json:"id" gorm:"primaryKey"`
    Username     string        `json:"username" gorm:"type:varchar(255);not null;unique"`
    Email        string        `json:"email" gorm:"type:varchar(255);not null;unique"`
    Password     string        `json:"password" gorm:"type:varchar(255);not null"`
    
    // Relationships
    Permissions  []Permission  `json:"permissions" gorm:"many2many:permission_to_users;constraint:OnDelete:CASCADE;"`
    Reviews      []Review      `json:"reviews" gorm:"foreignKey:UserId;constraint:OnDelete:CASCADE;"`
    Reservations []Reservation `json:"reservations" gorm:"foreignKey:UserId;constraint:OnDelete:CASCADE;"`
}

type Permission struct {
    Id   uint   `json:"id" gorm:"primaryKey"`
    Name string `json:"name" gorm:"type:varchar(255);not null;unique"`
}

type PermissionToUser struct {
    UserId       uint `json:"user_id" gorm:"primaryKey"`
    PermissionId uint `json:"permission_id" gorm:"primaryKey"`

    // Relations
    User       User       `json:"-" gorm:"foreignKey:UserId;constraint:OnDelete:CASCADE;"`
    Permission Permission `json:"-" gorm:"foreignKey:PermissionId;constraint:OnDelete:CASCADE;"`
}

type Review struct {
    Id      uint   `json:"id" gorm:"primaryKey"`
    UserId  uint   `json:"user_id" gorm:"not null"`
    Rating  uint   `json:"rating" gorm:"type:int;not null"`
    Review  string `json:"review" gorm:"type:text"`

    // Relations
    User User `json:"-" gorm:"foreignKey:UserId;constraint:OnDelete:CASCADE;"`
}

type Reservation struct {
    Id       uint      `json:"id" gorm:"primaryKey"`
    UserId   uint      `json:"user_id" gorm:"not null"`
    Reserved time.Time `json:"reserved" gorm:"type:datetime;not null"`

    // Relations
    User User `json:"-" gorm:"foreignKey:UserId;constraint:OnDelete:CASCADE;"`
}
