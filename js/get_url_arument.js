export function getURLArgument(targetedArgument) {
    let URLParameters = new URL(window.location.href).searchParams;
    let targetedParam = URLParameters.get(targetedArgument);
    let output = false

    if (targetedParam) { output = targetedParam; }
    return output
}