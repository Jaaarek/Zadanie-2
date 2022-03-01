import { count } from "console";
import fs, { write } from "fs";
import path from "path/posix";

/**
Piłkarze: 100zł wygrany / 80 remis / 50 przegrany
Siatkarze: 80 wygrany  / 40 remis / 20 przegrany
Koszykarze: 50 wygrany / 30 remis / 5 przegrany 


3 wygrane z rzędu: 15% premi
6 wygrany: 30% premi
Wszystkie w miesiącu przegrane: 20% mniej (kara)
 */

//typ 'football' 'volleyball' 'basketball'
// scores ['w', 'd', 'l']


function readFile(path: string): string {
    return fs.readFileSync(path, 'utf8')
}

function writeFile(path: string, content: string) {
    fs.writeFileSync(path, content)
}

function main(players: Array<[string, string, string[]]>): Array<[string, number]> {
    let player: [string, number] = ['undefind', 1]
    let playersSalaries: [[string, number]] = [['undefined', 1]]
    playersSalaries.pop()

    let n: number = players.length
    let salary: number = 0

    for (let i = 0; i < n; i++) {
        let type: string = players[i][0]
        let name: string = players[i][1]
        let scores: string[] = players[i][2]

        salary = calculateSalary(type, scores)
        player[0] = name
        player[1] = salary
        
        playersSalaries.push(player)
        player = ['none',0]
    }

    return playersSalaries;
}

enum player {
    football = 'football',
    volleyball = 'volleyball',
    basketball = 'basketball'
}

enum matchScore {
    win = 'w',
    draw = 'd',
    loss = 'l'
}

function calculateSalary(type: string, scores: string[]) {
    enum footballPrices {
        win = 100,
        draw = 80,
        loss = 50
    }

    enum volleyballPrices {
        win = 80,
        draw = 40,
        loss = 20
    }
    
    enum basketballPrices {
        win = 50,
        draw = 30,
        loss = 5
    }
 
    let footballSalaries: number[] = [footballPrices.win, footballPrices.draw, footballPrices.loss]
    let volleyballSalaries: number[] = [volleyballPrices.win, volleyballPrices.draw, volleyballPrices.loss]
    let basketballSalaries: number[] = [basketballPrices.win, basketballPrices.draw, basketballPrices.loss]

    let salary: number = 0

    switch (type){
        case player.football:
        salary = getSalary(scores, footballSalaries)
        break;
        case player.volleyball:
        salary = getSalary(scores, volleyballSalaries)
        break;
        case player.basketball:
        salary = getSalary(scores, basketballSalaries)
        break;
    }

    salary = getBonus(salary, scores)

    return salary;
}

function addPayment(salary: number, i: number, salaryType: number[], scores: string[]) {

    switch (scores[i]) {
        case matchScore.win:
        salary = salary + salaryType[0] 
        break;
        case matchScore.draw:
        salary = salary + salaryType[1]
        break;
        case matchScore.loss:
        salary = salary + salaryType[2]
        break;
    }
    return salary
}

function getSalary(scores: string[], salaryType: number[]) {
    let salary: number = 0
    let n: number = scores.length

    for (let i = 0; i < n; i++) {
        salary = addPayment(salary, i, salaryType, scores)
    }
    return salary
}


function getBonus(salary: number, scores: string[]) {
    let temporaryBonusCounter: number = 0
    let bonusCounter: number = 0
    let fineCounter: number = 0
    let n: number = scores.length

    for (let i = 0; i < n; i++) {
        switch(scores[i]) {
            case matchScore.win:
                temporaryBonusCounter = temporaryBonusCounter + 1
                break;

            case matchScore.draw:
                if (temporaryBonusCounter > bonusCounter) {
                    bonusCounter = temporaryBonusCounter
                    temporaryBonusCounter = 0
                }
                temporaryBonusCounter = 0
                break;

            case matchScore.loss:
                if (temporaryBonusCounter > bonusCounter) {
                    bonusCounter = temporaryBonusCounter
                    temporaryBonusCounter = 0
                }
                temporaryBonusCounter = 0
                fineCounter = fineCounter + 1
                break;
        } 
    }

    if (fineCounter === scores.length) {
        salary = salary * 0.8
        return salary
    }

    if (temporaryBonusCounter > bonusCounter) {
        bonusCounter = temporaryBonusCounter
    }

    if (bonusCounter >= 3 && bonusCounter < 6) {
        salary = salary + salary*0.15
        return salary
    }

    if (bonusCounter >= 6) {
        salary = salary + salary*0.3
        return salary
    }

    return salary
}

// const input: Array<[string, string, string[]]> = [
//     ['football', 'Lewandowski', ['w', 'w', 'l', 'w', 'w', 'w', 'd']],
//     ['volleyball', 'Kurek', ['d', 'd', 'l', 'w', 'l', 'w', 'd']],
//     ['football', 'Szczęsny', ['d', 'd', 'l', 'w', 'l', 'w', 'd']],
//     ['basketball', 'Gortat', ['w', 'w', 'w', 'w', 'w', 'w', 'l']],
//     ['basketball', 'Kozaski', ['l', 'l', 'l', 'l', 'l', 'l', 'l']]
// ]

let test: void = writeFile('input', 'sport')

console.log('Hello')