// Multithreading in Java is a feature that allows multiple parts of a program 
// (called threads) to run concurrently, improving performance and responsiveness. It 
// helps execute independent tasks in parallel, making applications faster and more 
// efficient.
// A thread is a lightweight sub-process. Java provides two ways to create threads:
//  Extending the Thread class
//  Implementing the Runnable interface

class MyThread extends Thread {
    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(Thread.currentThread().getName() + " - Count: " + i);
            try {
                Thread.sleep(500); // Pause for 500ms
            } catch (InterruptedException e) {
                System.out.println(e.getMessage());
            }
        }
    }
}
public class Multithreading {
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        MyThread t2 = new MyThread();
        // Start both threads
        t1.start();
        t2.start();
    }
}
