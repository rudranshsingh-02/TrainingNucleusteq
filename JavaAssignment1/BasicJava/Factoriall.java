import java.util.Scanner;

class Factoriall {
    static int Factorial(int num) {
        if (num == 0 || num == 1) { 
            return 1;
        }
        return num * Factorial(num - 1);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter number: ");
        int num = scanner.nextInt();

        if (num < 0) {
            System.out.println("Factorial is not defined for negative numbers.");
        } else {
            int factorial = Factorial(num);
            System.out.println("The factorial is: " + factorial);
        }

        scanner.close();
    }
}
