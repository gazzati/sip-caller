enum Color {
  Reset = "\x1b[0m",
  Red = "\x1b[31m",
  Green = "\x1b[32m",
  Yellow = "\x1b[33m",
  Blue = "\x1b[34m",
  Magenta = "\x1b[35m",
  Cyan = "\x1b[36m",
  White = "\x1b[37m",
  DarkBlue = "\x1b[94m"
}

enum Service {
  Consumer = "Consumer",
  Processor = "Processor",
  Outgoing = "Outgoing call",
  Talker = "Talker call",
  Api = "Api",
  Scripts = "Scripts"
}

interface Log {
  message: string
  eventId?: string
  isError?: boolean
}

class Logger {
  private maxWordSize
  private service

  constructor(service: string, maxWordSize = 20) {
    this.service = service
    this.maxWordSize = maxWordSize
  }

  public info(message: string, eventId?: string) {
    this.log({message, eventId})
  }

  public error(message: any, eventId?: string) {
    this.log({message: String(message), eventId, isError: true})
  }

  private log({ message, eventId, isError }: Log): void {
    let prettyMessage = message[0].toUpperCase() + message.slice(1, message.length)

    const today = new Date()
    const date = `${this.padZeros(today.getDate())}.${this.padZeros(today.getMonth() + 1)}.${this.padZeros(
      today.getFullYear()
    )}`
    const time = `${this.padZeros(today.getHours())}:${this.padZeros(today.getMinutes())}:${this.padZeros(today.getSeconds())}`

    // if (process.env.NODE_ENV === "test") return

    if (eventId) prettyMessage = `${Color.Cyan}[${eventId}]${Color.Reset} ${prettyMessage}`

    const spaces = this.getSpaces(this.service)
    const textColor = isError ? Color.Red : Color.White

    // eslint-disable-next-line no-console
    console.log(
      `${Color.Cyan}${date} ${time}${Color.Reset} ${this.getServiceColor(this.service)}[${this.service}]${Color.Reset}:  ${spaces}${textColor}${prettyMessage}${Color.Reset}`
    )
  }

  private getServiceColor(service: string) {
    const colors = [
      Color.Red,
      Color.Green,
      Color.Yellow,
      Color.Blue,
      Color.Magenta,
      Color.Cyan,
      Color.White,
      Color.DarkBlue
    ]

    const sum = service.split("").reduce((acc, item) => acc + item.charCodeAt(0), 0)
    return colors[sum % colors.length] || Color.Yellow
  }

  private getSpaces(service: string): string {
    if (service.length < this.maxWordSize) {
      return new Array(this.maxWordSize - service.length + 1).join(" ")
    }

    return ""
  }

  private padZeros(value: string | number, chars = 2): string {
    if (value.toString().length < chars) {
      const zeros = chars - value.toString().length
      const str = new Array(zeros).fill(0)
      return `${str.join("")}${value}`
    }

    return value.toString()
  }
}

export default Logger
export {Service}