export class CellData {
  value: number | undefined
  row: number
  col: number
  id: string
  section: number
  class: string
  poss: number[]

  constructor(value: number, row: number, col: number) {
    this.value = value
    this.row = row
    this.col = col
    this.id = row + '_' + col
    this.class = 'white'
    this.poss = [...Array(10).keys()].slice(1)
    switch (row) {
      case 0:
      case 1:
      case 2:
        switch (col) {
          case 0:
          case 1:
          case 2:
            this.section = 0
            break
          case 3:
          case 4:
          case 5:
            this.section = 1
            break
          default:
            this.section = 2
            break
        }
        break
      case 3:
      case 4:
      case 5:
        switch (col) {
          case 0:
          case 1:
          case 2:
            this.section = 3
            break
          case 3:
          case 4:
          case 5:
            this.section = 4
            break
          default:
            this.section = 5
            break
        }
        break
      default:
        switch (col) {
          case 0:
          case 1:
          case 2:
            this.section = 6
            break
          case 3:
          case 4:
          case 5:
            this.section = 7
            break
          default:
            this.section = 8
            break
        }
    }
  }
}
