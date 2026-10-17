const display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "0" || display.value === "Error") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {
    display.value = display.value.slice(0, -1) || "0";
}

function calculate() {
    try {
        let expression = display.value;

        // Convert calculator symbols into JavaScript expressions
        expression = expression.replace(/π/g, "pi");
        expression = expression.replace(/\bpi\b/g, "Math.PI");
        expression = expression.replace(/\be\b/g, "Math.E");
        expression = expression.replace(/sqrt\(/g, "Math.sqrt(");
        expression = expression.replace(/sin\(/g, "Math.sin(Math.PI/180*(");
        expression = expression.replace(/cos\(/g, "Math.cos(Math.PI/180*(");
        expression = expression.replace(/tan\(/g, "Math.tan(Math.PI/180*(");
        expression = expression.replace(/log\(/g, "Math.log10(");
        expression = expression.replace(/ln\(/g, "Math.log(");
        expression = expression.replace(/\^/g, "**");

        // Close the extra parenthesis added to trigonometric functions
        expression = expression.replace(
            /Math\.(sin|cos|tan)\(Math\.PI\/180\*\(([^()]*)\)/g,
            "Math.$1(Math.PI/180*($2))"
        );

        // Allow only calculator expression characters
        if (!/^[0-9+\-*/().\sA-Za-z]*$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        // Evaluate the expression
        const result = Function('"use strict"; return (' + expression + ')')();

        if (typeof result !== "number" || !Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        display.value = Number(result.toPrecision(12)).toString();

    } catch (error) {
        display.value = "Error";
    }
}
