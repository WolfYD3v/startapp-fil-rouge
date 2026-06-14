function F_GetURLArgument(V_TargetedArgument) {
    const C_URLParameters = new URL(window.location.href).searchParams;
    const C_TargetedParam = C_URLParameters.get(V_TargetedArgument);
    var V_Output = null

    if (C_TargetedParam != null) { V_Output = C_TargetedParam; }
    return V_Output
}