import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor Dbank {
  stable var currentValue: Float = 300;
  //currentValue := 100;


  stable var startTime = Time.now();
  Debug.print(debug_show(startTime));

  //let id = 2348923840929349;
  //Debug.print(debug_show(currentValue));
  //Debug.print(debug_show(id));

  public func topUp(amount: Float){
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  public func withdrawl(amount: Float){
    let tempValue: Float = currentValue - amount;
    if (tempValue >= 0){
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    } else {
      Debug.print("Err: Not enough balance");
    }
  };

  public query func checkBalance(): async Float {
    Debug.print(debug_show(Time.now()));
    return currentValue;
  };

  public func compound(){
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000; //10^-9
    currentValue := currentValue * (1.01 ** Float.fromInt(timeElapsedS));

    startTime := currentTime;
  }
}