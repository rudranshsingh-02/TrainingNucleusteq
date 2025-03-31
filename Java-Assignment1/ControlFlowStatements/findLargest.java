import java.util.Scanner;
class findLargest {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] numbers = new int[3];

        for (int i = 0; i < 3; i++) {
            System.out.print("Enter number " + (i + 1) + ": ");
            numbers[i] = scanner.nextInt();
        }
        
        if(numbers[0]>numbers[1]){
            if(numbers[0]>numbers[2]){
                System.out.println(numbers[0] + " is Largest.");
            }
            else{
                System.out.println(numbers[2] + " is Largest.");
            }
        }else{
            if(numbers[1]>numbers[2]){
                System.out.println(numbers[1] + " is Largest.");
            }else{
                System.out.println(numbers[2] + " is Largest.");
            }
        }
        scanner.close();
    }
}
