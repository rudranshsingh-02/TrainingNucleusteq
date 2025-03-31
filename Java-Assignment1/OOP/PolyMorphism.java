class Player {
  String name;
  int matchesPlayed;

  public Player(String name, int matchesPlayed) {
      this.name = name;
      this.matchesPlayed = matchesPlayed;
  }

  // Method Overloading: Display details
  public void showStats() {
      System.out.println("Player: " + name);
      System.out.println("Matches Played: " + matchesPlayed);
  }

  public void showStats(String message) {
      System.out.println(message);
      showStats();
  }
}

// Child Class: Batsman (Extends Player)
class Batsman extends Player {
  int totalRuns;

  public Batsman(String name, int matchesPlayed, int totalRuns) {
      super(name, matchesPlayed);
      this.totalRuns = totalRuns;
  }

  // Method Overriding: Modify showStats()
  public void showStats() {
      super.showStats();
      System.out.println("Total Runs: " + totalRuns);
  }
}

public class PolyMorphism {
  public static void main(String[] args) {
      Batsman player = new Batsman("Virat Kohli", 250, 12000);
      player.showStats(); // Calls overridden method
      player.showStats("Batsman Statistics:"); // Calls overloaded method
  }
}
