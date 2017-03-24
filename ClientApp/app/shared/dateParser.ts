export function ParseDate(value: string): Date {
    let date: Date = null;
    try {
      date = new Date(value);
      if (date.toString() == "Invalid Date") {
          throw new Error("Invalid date value");
      }
    }
    catch(err) {
      console.log("Exception: can't convert value '" + value + "' to Date. Exception: " + err);
    }
    return date;
}