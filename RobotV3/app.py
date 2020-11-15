from flask import Flask, render_template, Response, send_from_directory
# import numpy as np
# import cv2
# Raspberry Pi camera module (requires picamera package, developed by Miguel Grinberg)
from camera_pi import Camera
from gpiozero import LEDBoard

# cap = cv2.VideoCapture(-1)

leds = LEDBoard(0, 1, 2, 3, 4, pwm=False, active_high=False, initial_value=False, pin_factory=None)# LEDBoard(17, 18, 15, 27)
#my_message = "Started";

app = Flask(__name__)

# def get_frame():
#     while(cap.isOpened()):
#         ret, frame = cap.read()
#         if ret==True:
#             #frame = cv2.flip(frame,0)
#             return frame

@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')

@app.route('/static/assets/<path:path>')
def send_js(path):
    return send_from_directory('static/assets/', path)

@app.route("/switchlight/")
def switchlight():
    #Moving forward code
    #my_message = "Green!"
    print('Green!')
    leds[0].toggle()
    return "Nothing"

@app.route("/press/<nr>")
def press(nr):
    print('press!')
    # leds[int(nr)].on()
    if int(nr) == 0:
        leds[0].on()
        leds[1].on()
        leds[2].off()
        leds[3].on()
        leds[4].off()
    if int(nr) == 1:
        leds[0].on()
        leds[1].on()
        leds[2].off()
        leds[3].off()
        leds[4].on()
    if int(nr) == 2:
        leds[0].on()
        leds[1].off()
        leds[2].on()
        leds[3].on()
        leds[4].off()
    if int(nr) == 3:
        leds[0].on()
        leds[1].off()
        leds[2].on()
        leds[3].off()
        leds[4].on()
    return "Nothing"

@app.route("/release")
def release():
    print('release!')
    # leds[int(nr)].off()
    leds[0].off()
    leds[1].off()
    leds[2].off()
    leds[3].off()
    leds[4].off()
    return "Nothing"

def gen(camera):
    """Video streaming generator function."""
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/video_feed')
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen(Camera()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True, threaded=True)