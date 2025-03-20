import java.util.Scanner;
class Multiplicationtable {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a Number : ");
        int num  = scanner.nextInt();
        for(int i=1;i<11;i++){
            System.out.println(num * i);
        }
    }
