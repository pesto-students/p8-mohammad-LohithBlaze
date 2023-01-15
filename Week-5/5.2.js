function isVowel(char) {
    return "aeiou".includes(char);
}
function vowelCount(str) {
    const vowelMap = new Map();
    for (let char of str) {
        let lowerCaseChar = char.toLowerCase()
        if (isVowel(lowerCaseChar)) {
            if (vowelMap.has(lowerCaseChar)) {
                vowelMap.set(lowerCaseChar, vowelMap.get(lowerCaseChar) + 1);
            } else {
                vowelMap.set(lowerCaseChar, 1);
            }
        }
    }
    return vowelMap;
}

console.log(vowelCount("Lorem ipsum dolor sit amet, consectetur adipiscing elit. In efficitur, nisl in feugiat porta, lacus lacus varius dui, ac fermentum lacus nunc sed velit. In a interdum quam, convallis lacinia ante. Quisque eget congue erat, et ornare metus. Proin porttitor, orci a fringilla ultrices, erat odio ullamcorper leo, eget malesuada erat risus ac eros. Phasellus ac magna et odio tempus pulvinar. Cras in venenatis quam. Aenean sagittis finibus luctus. Sed libero metus, vestibulum eu tellus non, facilisis malesuada diam. Nunc in vulputate augue."));