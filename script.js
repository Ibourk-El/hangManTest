let letters = "azertyuiopmlkjhgfdsqwxcvbn"
let answerBox = document.getElementById( "answer-box" )
let chanceEl = document.getElementById( "chance" )

let chance = 10;
let word = "hello"
let text="-----"
// letters box
function createLetterBox (value,className)
{
    let span = document.createElement( "span" )
    span.className = className;
    span.innerHTML = value
    if ( className === "letter" )
    {
        addEventToLetter( span )
        span.classList.add("clicked")
    }
    return span
}
// for keyboard
function pushLettersToBox (className,letters,elFun,elClass)
{
    let Box = document.getElementById( className )
    let len=letters.length
    for ( let i = 0; i < len; i++ )
    {
        Box.appendChild( elFun( letters[ i ], elClass ) )
    }
    
}
//add enents keyBord
function addEventToLetter (letterBox)
{
				letterBox.addEventListener( "click", ( e ) =>
				{
            if ( letterBox.classList.contains( "clicked" ))
     				{
							console.log( letterBox.classList.contains( "clicked" ), "jjj" )
									
							if ( checkIfletterInAnsewr( word, e.target.innerHTML ) )
							{
								e.target.classList.add( "true" )
							}
							else
							{
								e.target.classList.add( "false" )
								chance--
								chanceEl.innerHTML = chance
								lose (chance)
							}
							letterBox.classList.remove( "clicked" )
						}
        } )
}
function checkIfletterInAnsewr ( answer, char)
{
    // console.log(char,answer)
    let len = answer.length
    let isFinedIt=false
    for ( let i = 0; i < len; i++ )
    {
        if ( answer[ i ] === char )
        {
            answerBox.children[ i ].innerHTML = char
            isFinedIt=true
        }
    }
    return isFinedIt
    
}

function lose (x)
{
	if ( x == 0 )
	{
		console.log("lost")
	}
}


pushLettersToBox("keyboard-box",letters,createLetterBox,"letter")
pushLettersToBox("answer-box",text,createLetterBox,"answer-letter")




