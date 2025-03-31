// Encapsulation is the process of wrapping data (variables) and methods into a single unit (class) while restricting direct access to some details. This is achieved by:
// Marking variables as private (hiding them from outside the class).
// Providing public getter and setter methods to access or modify data in a controlled way.

// Class with Encapsulation
class CricketPlayer {
  private String name;
  private int runs;
  private double average;

  public CricketPlayer(String name, int runs, double average) {
    this.name = name;
    this.runs = runs;
    this.average = average;
  }

  public String getName() {
    return name;
  }

  public int getRuns() {
    return runs;
  }

  public double getAverage() {
    return average;
  }

  public void setRuns(int runs) {
    if (runs >= 0) {
      this.runs = runs;
    } else {
      System.out.println("Runs cannot be negative.");
    }
  }

  public void setAverage(double average) {
    if (average >= 0) {
      this.average = average;
    } else {
      System.out.println("Average cannot be negative.");
    }
  }
}

public class Encapsulation {
  public static void main(String[] args) {
    CricketPlayer player = new CricketPlayer("Virat Kohli", 12000, 58.2);
    // Accessing data through getters
    System.out.println("Player Name: " + player.getName());
    System.out.println("Total Runs: " + player.getRuns());
    System.out.println("Batting Average: " + player.getAverage());
    // Modifying data through setters
    player.setRuns(12500);
    System.out.println("Updated Runs: " + player.getRuns());
  }
}
