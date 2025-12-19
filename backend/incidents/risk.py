def calculate_risk(incident_type, time):
    score = 0

    if incident_type == 'theft':
        score += 30
    elif incident_type == 'accident':
        score += 20
    else:
        score += 10

    if time.hour >= 20 or time.hour <= 6:
        score += 20

    if score >= 60:
        level = 'High'
    elif score >= 30:
        level = 'Medium'
    else:
        level = 'Low'

    return score, level
