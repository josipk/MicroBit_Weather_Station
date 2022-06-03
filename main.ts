dstemp.sensorError(function (errorMessage, errorCode, port) {
    t1_error = 1
})
let t1_error = 0
let t1 = 0
let temp2 = 0
let hum2 = 0
let air = 0
serial.setBaudRate(BaudRate.BaudRate115200)
loops.everyInterval(600, function () {
    air = pins.analogReadPin(AnalogPin.P1)
})
basic.forever(function () {
    t1_error = 0
    t1 = dstemp.celsius(DigitalPin.P16)
    if (t1_error == 1) {
        t1 = -99
    }
    if (convertToText(t1) == "-Infinity") {
        t1 = -99
    }
    serial.writeString("0,")
    serial.writeNumber(t1)
    serial.writeString(",")
    serial.writeNumber(temp2)
    serial.writeString(",")
    serial.writeNumber(hum2)
    serial.writeString(",")
    serial.writeNumber(air)
    serial.writeLine(",")
    basic.pause(200)
})
loops.everyInterval(700, function () {
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P8,
    true,
    false,
    false
    )
    if (dht11_dht22.readDataSuccessful()) {
        temp2 = dht11_dht22.readData(dataType.temperature)
        hum2 = dht11_dht22.readData(dataType.humidity)
    }
})
