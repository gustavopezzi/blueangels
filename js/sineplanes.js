document.addEventListener("DOMContentLoaded", function(event) {
    var ANIMATION_SPEED = 15;
    var PLANE_UNIT_OFFSET = 60;
    var canvas, context;
    var height, width, xAxis, yAxis;
    var draw;

    function init() {
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");

        height = canvas.height;
        width = canvas.width;

        xAxis = Math.floor(height / 2);
        yAxis = Math.floor(width / 4);

        context.save();
        draw();
    }

    function draw() {
        context.clearRect(0, 0, width, height);

        // smoke style
        grd = context.createLinearGradient(0.000, 0.000, 800.000, 0.000);
        grd.addColorStop(0, 'rgba(230, 230, 230, 1.000)');
        grd.addColorStop(1, 'rgba(150, 150, 150, 0.00)');
        context.strokeStyle = grd;
        context.lineWidth = 2;

        // first plane
        context.beginPath();
        drawSine(draw.t, PLANE_UNIT_OFFSET, 0, 1);
        context.stroke();
        drawPlane(draw.t, PLANE_UNIT_OFFSET, 0, 1);

        // second plane
        context.beginPath();
        drawSine(draw.t, PLANE_UNIT_OFFSET * 2, 50, -1);
        context.stroke();
        drawPlane(draw.t, PLANE_UNIT_OFFSET * 2, 50, -1);

        // third plane
        context.beginPath();
        drawSine(draw.t, PLANE_UNIT_OFFSET * 2, 100, 1);
        context.stroke();
        drawPlane(draw.t, PLANE_UNIT_OFFSET * 2, 100, 1);

        // fourth plane
        context.beginPath();
        drawSine(draw.t, PLANE_UNIT_OFFSET * 1/150, 150, -1);
        context.stroke();
        drawPlane(draw.t, PLANE_UNIT_OFFSET * 1/150, 150, -1);

        context.restore();

        draw.seconds = draw.seconds - 0.007;
        draw.t = draw.seconds * Math.PI;
        setTimeout(draw , ANIMATION_SPEED);
    };

    draw.seconds = 0;
    draw.t = 0;

    function drawSine(t, unitval, offset, direction) {
        for (i = yAxis; i <= width; i += 10) {
            x = t + (-yAxis + i) / unitval;
            y = Math.sin(x) * direction;
            context.lineTo(i + offset , (unitval / 3) * y + xAxis);
        }
    }

    function drawPlane(t, unitVal, offset, direction) {
        var y = xAxis + (unitVal / 3) * Math.sin(t) * direction;
        var img = new Image();
        img.src = "img/plane.png";
        context.drawImage(img, yAxis - 29  + offset , y - 16 );
        context.stroke();
    }

    init();
});