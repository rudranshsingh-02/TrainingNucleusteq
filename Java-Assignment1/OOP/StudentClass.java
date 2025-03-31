import java.util.ArrayList;

class StudentClass {
    String name;
    int rollNumber;
    double marks;

    // Constructor
    public StudentClass(String name, int rollNumber, double marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.marks = marks;
    }

    // Method to display student details
    public void displayStudent() {
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Marks: " + marks);
        System.out.println("----------------------");
    }

    public static void main(String[] args) {
        // Creating student objects
        ArrayList<StudentClass> students = new ArrayList<>();
        students.add(new StudentClass("Alice", 101, 92.5));
        students.add(new StudentClass("Bob", 102, 85.0));
        students.add(new StudentClass("Charlie", 103, 78.5));

        // Printing all student details
        System.out.println("Student Details:");
        System.out.println("======================");
        for (StudentClass student : students) {
            student.displayStudent();
        }
    }
}
