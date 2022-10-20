export const getDistanceColor = (distance: number): string => {
    if(distance < 5) {
        return "green";
    } else if (distance < 15) {
        return "yellow"
    } else if (distance < 25) {
        return "orange";
    } else {
        return "red";
    }
}
export const getEmergencyLevel = (emergency: number): string => {
    if(emergency <= 2) {
        return "green";
    } else if (emergency <= 4) {
        return "yellow"
    } else if (emergency <= 6) {
        return "orange";
    }
    else if (emergency <= 8) {
        return "pink";
    }  else {
        return "red";
    }
}
