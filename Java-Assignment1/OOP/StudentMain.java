import java.util.ArrayList;

class Student {
    String name;
    int rollNumber;
    double marks;

    public Student(String name, int rollNumber, double marks) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.marks = marks;
    }

    public void displayStudent() {
        System.out.println("Name: " + name);
        System.out.println("Roll Number: " + rollNumber);
        System.out.println("Marks: " + marks);
        System.out.println("----------------------");
    }
}

// Derived class
class GraduateStudent extends Student {
    String specialization;
    String thesisTitle;

    public GraduateStudent(String name, int rollNumber, double marks, String specialization, String thesisTitle) {
        super(name, rollNumber, marks); 
        this.specialization = specialization;
        this.thesisTitle = thesisTitle;
    }

    @Override
    public void displayStudent() {
        super.displayStudent();
        System.out.println("Specialization: " + specialization);
        System.out.println("Thesis Title: " + thesisTitle);
        System.out.println("----------------------");
    }
}

public class StudentMain {
    public static void main(String[] args) {
        ArrayList<Student> students = new ArrayList<>();
        students.add(new Student("Alice", 101, 92.5));
        students.add(new Student("Bob", 102, 85.0));
        students.add(new GraduateStudent("Charlie", 103, 88.0, "Computer Science", "AI in Healthcare"));
        students.add(new GraduateStudent("David", 104, 91.5, "Physics", "Quantum Mechanics"));

        // Printing all student details
        System.out.println("Student Details:");
        System.out.println("======================");
        for (Student student : students) {
            student.displayStudent();
        }
    }
}
