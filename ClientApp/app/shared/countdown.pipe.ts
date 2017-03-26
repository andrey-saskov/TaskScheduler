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
        let parts = [];
        let timeLeft = Math.floor(value / this.miliseconds);
        let formatedValue =  this.format(timeLeft, 0, parts);
        return parts.length > 1 ? parts.pop() + " " + parts.pop() : parts.pop();
    }

    private format(timeLeft: number, level: number, parts: string[]): void {
        if (timeLeft > 0 && level < this.formatParts.length) {
            if ((timeLeft % this.formatParts[level].divider) > 0) {
                parts.push(((timeLeft % this.formatParts[level].divider) + this.formatParts[level].dimension));
            }
            this.format(Math.floor(timeLeft / this.formatParts[level].divider), level + 1, parts);
        }
    }
}