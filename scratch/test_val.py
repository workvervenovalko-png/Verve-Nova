def test_validation(name, value):
    # Regex check
    import re
    if value != "" and not re.match(r"^\d*\.?\d*$", value):
        return "BLOCKED (Regex)"
    
    try:
        num = float(value)
    except ValueError:
        num = float('nan')
        
    if name == 'cgpa' and num > 10:
        return "BLOCKED (CGPA > 10)"
    if name.endswith('Percentage') and num > 100:
        return "BLOCKED (Perc > 100)"
    
    return "ALLOWED"

print(f"CGPA '9': {test_validation('cgpa', '9')}")
print(f"CGPA '9.': {test_validation('cgpa', '9.')}")
print(f"CGPA '9.5': {test_validation('cgpa', '9.5')}")
print(f"CGPA '10': {test_validation('cgpa', '10')}")
print(f"CGPA '10.1': {test_validation('cgpa', '10.1')}")
print(f"CGPA '11': {test_validation('cgpa', '11')}")
print(f"CGPA '95': {test_validation('cgpa', '95')}")

print(f"Perc '9': {test_validation('tenthPercentage', '9')}")
print(f"Perc '95': {test_validation('tenthPercentage', '95')}")
print(f"Perc '95.5': {test_validation('tenthPercentage', '95.5')}")
print(f"Perc '100': {test_validation('tenthPercentage', '100')}")
print(f"Perc '101': {test_validation('tenthPercentage', '101')}")
