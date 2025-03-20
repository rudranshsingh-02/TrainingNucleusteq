import java.util.Scanner;
class CalculateRectangle {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the length of rectangle : ");
        int length = scanner.nextInt();
        System.out.println("Enter the breadth of rectangle : ");
        int breadth = scanner.nextInt();
        int areaOfRectangle = length*breadth;
        System.out.print("Area of Rectangle is : ");
        System.out.print(areaOfRectangle);
    }
}
