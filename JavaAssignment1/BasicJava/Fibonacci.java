import java.util.Scanner;
class Fibonacci {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter the limit for Fibonacci sequence: ");
        int limit = scanner.nextInt();
        if (limit < 0) {
            System.out.println("Please enter a non-negative number.");
        } else {
            System.out.println("Fibonacci sequence up to " + limit + ":");
            printFibonacci(limit);
        }
        scanner.close();
    }

    static void printFibonacci(int limit) {
        int a = 0, b = 1;
        System.out.print(a + " " + b + " "); 

        int next;
        while (true) {
            next = a + b;
            if (next > limit) {
                break;
            }
            System.out.print(next + " ");
            a = b;
            b = next;
        }
        System.out.println(); 
    }
}
