import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdownFormat'
})
export class CountdownPipe implements PipeTransform {
    private readonly miliseconds = 1000;

    private readonly formatParts = [
        { divider: 60, dimension: "s" },
        { divider: 60, dimension: "min" },
        { divider: 24, dimension: "h" },
        { divider: 7, dimension: " days" },
        { divider: 1000, dimension: " weeks" }
    ];

    public transform(value: number, format: string): string {
        let result = "";
        let timeLeft = Math.floor(value / this.miliseconds);
        return this.Rec(timeLeft, 0);
    }

    private Rec(timeLeft: number, level: number): string {
        if (timeLeft > 0 && level < this.formatParts.length) {
            return this.Rec(Math.floor(timeLeft / this.formatParts[level].divider), level + 1)
                + ((timeLeft % this.formatParts[level].divider) > 0 ? " " + ((timeLeft % this.formatParts[level].divider) + this.formatParts[level].dimension) : "");
        }
        return "";
    }
}