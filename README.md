# 🎮 เกมเป่ายิ้งฉุบ OOP (Rock Paper Scissors)

โปรแกรมเกมเป่ายิ้งฉุบแบบ Web Application เขียนด้วยภาษา **JavaScript** โดยใช้แนวคิด **OOP (Object-Oriented Programming)** อย่างครบถ้วน  

🔗 **ลิงก์สำหรับเล่นเกม:** [https://stirring-piroshki-873f9c.netlify.app/](https://stirring-piroshki-873f9c.netlify.app/)

---

### 📌 สิ่งที่โปรแกรมทำได้
-   **เพิ่มผู้เล่นใหม่** เพื่อเริ่มเล่นและเก็บสถิติ  
-   **ลบผู้เล่น** ออกจากระบบ  
-   **ค้นหาผู้เล่น** ที่มีอยู่เพื่อเล่นต่อ  
-   **แสดงรายชื่อผู้เล่นทั้งหมด** ผ่านตารางจัดอันดับ  
-   **เล่นเกมเป่ายิ้งฉุบ** กับคอมพิวเตอร์ และบันทึกสถิติ (แพ้/ชนะ/เสมอ)  
-   **ดูตารางจัดอันดับ (Leaderboard)** โดยเรียงจากผู้เล่นที่ชนะมากที่สุด  
-   **สลับโหมดการแสดงผล** เป็นโหมดกลางวัน/กลางคืน (Dark Mode)  

---

### 📌 Feature / Function
-   **Add Player** → สร้าง `object` ใหม่จากคลาส `HumanPlayer`  
-   **Delete Player** → ลบ `object` ของผู้เล่นออกจากระบบ  
-   **Search Player** → ค้นหาผู้เล่นจากชื่อ  
-   **Play Game** → เล่นเกมกับคอมพิวเตอร์และอัปเดตสถิติ  
-   **Leaderboard** → จัดอันดับผู้เล่นตามจำนวนการชนะ  
-   **Dark Mode** → เปลี่ยนโหมดกลางวัน/กลางคืน  

---

### 📌 OOP Design

**Class ที่ใช้ (5 คลาสหลัก)**  
1. `Player` → **Class แม่** เก็บข้อมูลพื้นฐานของผู้เล่น (ชื่อ, ชนะ, แพ้, เสมอ)  
2. `HumanPlayer` → **Class ลูก** สืบทอดจาก `Player` แทนผู้เล่นที่เป็นคน  
3. `ComputerPlayer` → **Class ลูก** สืบทอดจาก `Player` ตัวแทนคอมพิวเตอร์ มีการสุ่มเลือก (Rock, Paper, Scissors)  
4. `Leaderboard` → จัดการและแสดงอันดับผู้เล่นตามสถิติ  
5. `GameManager` → ควบคุมการทำงานทั้งหมด (เพิ่ม/ลบ/ค้นหาผู้เล่น, เรียกเล่นเกม, อัปเดต leaderboard)  

---

### 📌 การใช้ OOP

- **Encapsulation**  
  - ซ่อนรายละเอียดข้อมูลผู้เล่น (name, win, lose, draw) ภายใน `Player`  
  - เข้าถึง/อัปเดตผ่าน method เช่น `updateResult()`  

- **Inheritance**  
  - `HumanPlayer` และ `ComputerPlayer` **extends** จาก `Player`  
  - Reuse โค้ดเกี่ยวกับสถิติและข้อมูลพื้นฐาน  

- **Polymorphism**  
  - เมธอด `makeMove()` ทำงานต่างกัน  
    - `HumanPlayer` → รับ input จากผู้ใช้  
    - `ComputerPlayer` → สุ่มค่าอัตโนมัติ  

---