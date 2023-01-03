function createIncrement() 
{
    let count=0; 
    function increment() { 
        count++; 
    }
    let message = `Count is ${count}`; 
    function log() { 
        console.log(message);
    }
    return [increment,log];
}
const [increment,log] = createIncrement();
increment();
increment();
increment();
log();// What is logged?

// Count is 0 because when the createIncrement function is called, the message variable is 
// already declared and set to string "Count is 0" since during that time count was 0, but 
// we are incrementing the count variable but not resetting the message variable and hence the output is
// Count is 0.
