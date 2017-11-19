function setupTask(canvasId, taskFunction) {
    var canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.log("Could not find canvas with id", canvasId);
        return;
    }

    var renderWidth, renderHeight;
    function computeCanvasSize() {
        renderWidth = canvas.parentNode.clientWidth - 20;
        renderHeight = Math.floor(renderWidth*9.0/16.0);
        canvas.width = renderWidth;
        canvas.height = renderHeight;
    }

    window.addEventListener('resize', computeCanvasSize);
    computeCanvasSize();

    var task = new taskFunction(canvas);

    var mouseDown = false;
    var lastMouseY;
    var mouseMoveListener = function(event) {
        task.dragCamera(event.screenY - lastMouseY);
        lastMouseY = event.screenY;
    };
    canvas.addEventListener('mousedown', function(event) {
        if (!mouseDown && event.button == 0) {
            mouseDown = true;
            lastMouseY = event.screenY;
            document.addEventListener('mousemove', mouseMoveListener);
        }
        event.preventDefault();
    });
    document.addEventListener('mouseup', function(event) {
        if (mouseDown && event.button == 0) {
            mouseDown = false;
            document.removeEventListener('mousemove', mouseMoveListener);
        }
    });

    var renderLoop = function() {
        task.render(canvas, renderWidth, renderHeight);
        window.requestAnimationFrame(renderLoop);
    }
    window.requestAnimationFrame(renderLoop);

    return task;
}

function clear(context, w, h)
{
    context.fillStyle = "#fff";
    context.fillRect(0, 0, w, h);
}
