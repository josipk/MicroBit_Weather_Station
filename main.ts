dstemp.sensorError(function (errorMessage, errorCode, port) {
    t1_error = 1
})
let t1_error = 0
let t1 = 0
let temp2 = 0
let hum2 = 0
loops.everyInterval(1000, function () {
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
basic.forever(function () {
    t1_error = 0
    t1 = dstemp.celsius(DigitalPin.P16)
    if (t1_error == 0) {
        serial.writeString("0,")
        serial.writeNumber(t1)
        serial.writeString(",")
        serial.writeNumber(temp2)
        serial.writeString(",60")
        serial.writeLine("")
    }
})