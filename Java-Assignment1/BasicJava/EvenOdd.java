import java.util.Scanner;
class EvenOdd {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter number : ");
        int num = scanner.nextInt();
        if(num%2==0){
            System.out.println("Number is Even.");
        }else{
            System.out.println("Number is Odd");
        }
    }
}
