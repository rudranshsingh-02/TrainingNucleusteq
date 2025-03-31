import java.util.Scanner;
class CalculateCircle {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter the radius of circle: ");
        int num = scanner.nextInt();
        double areaOfCircle = 3.14*num*num;
        System.out.print("Area of Circle is : ");
        System.out.print(areaOfCircle);
    }
}
