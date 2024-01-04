package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"sync"
)

var (
	queueMutex sync.Mutex
	queue      int
	bookings   []BookingRequest
)

type BookingRequest struct {
	Name        string `json:"name"`
	Surname     string `json:"surname"`
	Phone       string `json:"phone"`
	Email       string `json:"email"`
	QueueNumber int    `json:"queueNumber"`
	statusQueue bool   `json:"statusQueue"`
}

func main() {
	queue = 1
	http.HandleFunc("/api/bookings", handleBooking)
	http.HandleFunc("/api/viewall", handleView)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func handleBooking(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	// ตรวจสอบ preflight request (OPTIONS)
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}

	// ตรวจสอบ method และ headers ที่ได้รับ
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// ดึงข้อมูลจาก request body
	var bookingRequest BookingRequest
	err := json.NewDecoder(r.Body).Decode(&bookingRequest)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}
	fmt.Println(bookings)
	// ตรวจสอบว่าข้อมูลซ้ำกันหรือไม่
	if isDuplicateBooking(bookingRequest) {
		fmt.Println(bookingRequest)
		http.Error(w, "Booking already exists", http.StatusConflict)
		return
	}

	// จองคิว
	queueMutex.Lock()
	bookingRequest.QueueNumber = queue
	queue++
	bookings = append(bookings, bookingRequest)
	queueMutex.Unlock()
	fmt.Println(bookingRequest)
	// ตอบกลับด้วยข้อมูลลำดับคิว
	w.Header().Set("Content-Type", "application/json")
	//sendEmail(bookingRequest)
	json.NewEncoder(w).Encode(bookingRequest)
}

func isDuplicateBooking(newBooking BookingRequest) bool {
	for _, existingBooking := range bookings {
		if existingBooking.Name == newBooking.Name &&
			existingBooking.Surname == newBooking.Surname &&
			existingBooking.Phone == newBooking.Phone &&
			existingBooking.Email == newBooking.Email &&
			existingBooking.QueueNumber != 0 {
			return true
		}
	}
	return false
}

func sendEmail(bookingRequest BookingRequest) error {
	from := "wirunkhemmontha38@gmail.com" // อีเมล์ต้นทาง
	to := bookingRequest.Email
	password := "iohv ggmy jqwk ymwv" // รหัสผ่าน
	subject := "การจองคิวของคุณได้ถูกจองเรียบร้อยแล้ว"
	numberQ := bookingRequest.QueueNumber
	mainText := "ขอบคุณสำหรับการใช้บริการของเรา ลำดับคิวที่ "
	body := fmt.Sprintf("%s %d\n", mainText, numberQ)
	// กำหนดค่าที่จำเป็นสำหรับการเชื่อมต่อ SMTP
	auth := smtp.PlainAuth("", from, password, "smtp.gmail.com")
	fmt.Println(auth)
	// กำหนดที่อยู่ของ SMTP server
	smtpServer := "smtp.gmail.com"
	// กำหนดที่อยู่และพอร์ตที่ใช้
	smtpPort := "587"
	// กำหนดข้อมูลของอีเมล์
	message := fmt.Sprintf("To: %s\r\n"+
		"Subject: %s\r\n"+
		"\r\n"+
		"%s\r\n", to, subject, body)

	// ส่งอีเมล์
	fmt.Println(message)
	err := smtp.SendMail(smtpServer+":"+smtpPort, auth, from, []string{to}, []byte(message))
	fmt.Println(err)
	if err != nil {
		return err
	}

	return nil
}

func handleView(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.WriteHeader(http.StatusOK)
		return
	}

	// ตรวจสอบ method และ headers ที่ได้รับ
	if r.Method != http.MethodGet {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	// ให้ใช้ตัวแปร tempBookings เพื่อเก็บข้อมูลที่ต้องการ
	var tempBookings []BookingRequest

	// วนลูปเพื่อตรวจสอบและเก็บข้อมูล
	for _, existingBooking := range bookings {
		if existingBooking.statusQueue == false {
			tempBookings = append(tempBookings, existingBooking)
		}
	}

	// ตั้งค่า bookings ใหม่
	bookings = tempBookings
	// ตอบกลับด้วยข้อมูลลำดับคิว
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(bookings)
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type")
}
