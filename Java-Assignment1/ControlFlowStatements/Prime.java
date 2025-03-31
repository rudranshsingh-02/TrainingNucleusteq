import java.util.Scanner;
class Prime {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter number : ");
        int num = scanner.nextInt();
        int count = 0;
        if(num<=1){
            System.out.println("Number is not prime");
        }else{
            for(int i=1;i<=num;i++){
                if(num%i==0){
                    count++;
                }
            }
        }
        if(count>2){
            System.out.println(num + " is not prime");
        }else{
            System.out.println(num + " is prime");
        }
    }
}
