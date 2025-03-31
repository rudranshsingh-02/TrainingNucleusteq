import java.util.Scanner;
import java.lang.Math;

class TriangleAreaCalculator {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    while (true) {
      System.out.println("\nChoose a method to calculate the area of a triangle:");
      System.out.println("1. Base & Height");
      System.out.println("2. Heron's Formula (3 Sides Known)");
      System.out.println("3. Equilateral Triangle");
      System.out.println("4. Exit");
      System.out.print("Enter your choice: ");

      int choice = scanner.nextInt();
      switch (choice) {
        case 1:
          calculateUsingBaseHeight(scanner);
          break;
        case 2:
          calculateUsingHeronsFormula(scanner);
          break;
        case 3:
          calculateUsingEquilateralFormula(scanner);
          break;
        case 4:
          System.out.println("Exiting program. Goodbye!");
          scanner.close();
          return;
        default:
          System.out.println("Invalid choice! Please enter a number between 1 and 4.");
      }
    }
  }

  // 1. Base & Height
  private static void calculateUsingBaseHeight(Scanner scanner) {
    System.out.print("Enter base: ");
    double base = scanner.nextDouble();
    System.out.print("Enter height: ");
    double height = scanner.nextDouble();
    double area = 0.5 * base * height;
    System.out.println("Area of Triangle: " + area);
  }

  // 2. Heron's Formula
  private static void calculateUsingHeronsFormula(Scanner scanner) {
    System.out.print("Enter side a: ");
    double a = scanner.nextDouble();
    System.out.print("Enter side b: ");
    double b = scanner.nextDouble();
    System.out.print("Enter side c: ");
    double c = scanner.nextDouble();

    double s = (a + b + c) / 2;
    double area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    System.out.println("Area of Triangle (Heron's Formula): " + area);
  }

  // 3. Equilateral Triangle
  private static void calculateUsingEquilateralFormula(Scanner scanner) {
    System.out.print("Enter the side length: ");
    double a = scanner.nextDouble();

    double area = (Math.sqrt(3) / 4) * a * a;
    System.out.println("Area of Equilateral Triangle: " + area);
  }
}
