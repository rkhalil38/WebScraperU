import { createClient } from "@supabase/supabase-js";
import { Console } from "console";
import * as cheerio from 'cheerio';
import validator from "validator";
require('dotenv').config()

const supabase_key: string = process.env.DATABASE_ENDPOINT? process.env.DATABASE_ENDPOINT : ''

//create supabase client to store to database
const supabase = createClient(
    'https://rievaasppfxgozuupggo.supabase.co',
    supabase_key
)

//removes duplicate strings from a list of strings
function removeDuplicates(dirtyData: string[]){
    const cleanArray: string[] = []
    dirtyData.forEach(element => { 
        if (!cleanArray.includes(element)) { 
            cleanArray.push(element); 
        } 
    }); 

    return cleanArray
    
}

//function that removes any string from a list of strings that contains the word "ad"
function removeAds(dirtyData: string[]){
    const cleanArray: string[] = []

    dirtyData.forEach(element => {
        if (!element.toLowerCase().includes(" ad ") && !element.toLowerCase().includes(" ads ")){
            cleanArray.push(element)
        }

    })

    return cleanArray
}

//finds that amount of raw mentions in a list of strings
//think command + f on the list
function findStringMentions(stringArray: string[], wordList: string[]){
    let count = 0

    stringArray.forEach((string) => {

        const stringArray = string.split(' ')

        for (let j = 0; j < wordList.length; j++){
            let alreadyFound = false
            for (let n = 0; n < stringArray.length; n++){
                if (stringArray[n].toLowerCase().includes(wordList[j].toLowerCase())){
                        alreadyFound = true
                        count += 1
                }
            }
            
            if (wordList[j].toLowerCase().includes(string.toLowerCase())
            && wordList[j].length > string.length){
                count += 1
            }
            
            if (string.toLowerCase().includes(wordList[j].toLowerCase()) && !alreadyFound){
                count += 1
            }

        }
        
    }
    );

    return count
}

//function that leverages all the functions created above to clean the data
function cleanData(dirtyData: string[]){
    
    let cleanData = dirtyData? removeDuplicates(dirtyData) : []
    cleanData = removeAds(cleanData? cleanData : [])
    //cleanData = removeLongStrings(cleanData? cleanData : [])

    return cleanData

}

//post the data to the database
export async function POST(request: Request){

    try {
        
        const post_data = await request.json()
            
        const { data, error } = await supabase
        .from('WordsAndURLs')
        .insert([
        { words: post_data['words'], user_id: post_data['user_id'], urls: post_data['urls']},
        ])
        .select()

        return new Response(JSON.stringify( {message: 'hey'}))

    } catch(error){
        (error)
        return new Response("Error")
    }

}

//uses urls and words passed as params to find mentions of the words in the urls
export async function GET(request: Request){

    const { searchParams } = new URL(request.url)
    const words = searchParams.get('words')
    const urls = searchParams.get('urls')

    const urlList = urls? urls.split('---') : []
    const wordList = words? words.split('---') : []

    //checks if the urls are valid
    let allowParsing = false
    for (let i = 0; i < urlList.length; i++){
        allowParsing = validator.isURL(urlList[i])
    }
    
    if (allowParsing){

        try {
            const mentions = []

            for (let i = 0; i < urlList.length; i++){
                const parsing_page = await fetch(urlList? urlList[i] : '')
                const html = await parsing_page.text()
                
                const $ = cheerio.load(html)

                const cleanListForMentions: string[] = []
                const textArray: string[] = []

                for (let j = 0; j < wordList.length; j++){

                    let stringToLocate = ''

                    if (wordList[j].split('-').length > 1){
                        stringToLocate = wordList[j].split('--').join(' ')
                    }
                    else{
                        stringToLocate = wordList[j]
                    }

                    cleanListForMentions.push(stringToLocate)

                    //need to select all elements that contain the word only in p, span, and h1-h6 tags

                    //finds all elements that contain the unaltered string
                    const normalSelector = ":contains('" + stringToLocate + "')"
                    const relevantNormalElements = $('p' + normalSelector + ',span' + normalSelector + ',a' 
                    + normalSelector + ',div span' + normalSelector
                    + ',code' + normalSelector + ',td' + normalSelector + ',h1' + normalSelector 
                    + ',h2' + normalSelector + ',h3' + normalSelector + ',h4' + normalSelector 
                    + ',h5' + normalSelector + ',h6' + normalSelector)

                    //finds all elements that contain the string in lowercase
                    const selector = ":contains('" + stringToLocate.toLowerCase() + "')"
                    const relevantElements = $('p' + selector + ',span' + selector + ',a'
                    + selector + ',div span' + selector + ',code' + selector + ',td' + selector + ',h1' + selector + ',h2' + selector + ',h3' + selector 
                    + ',h4' + selector + ',h5' + selector + ',h6' + selector)

                    //finds all elements that contain the string in all caps
                    const allCapsSelector = ":contains('" + stringToLocate.toUpperCase() + "')"
                    const relevantAllCaps = $('p' + allCapsSelector + ',span' + allCapsSelector +
                    + ',a' + allCapsSelector + ',div span' + allCapsSelector + ',code' + allCapsSelector + ',td' + allCapsSelector + ',h1' + allCapsSelector 
                    + ',h2' + allCapsSelector + ',h3' + allCapsSelector + ',h4' 
                    + allCapsSelector + ',h5' + allCapsSelector + ',h6' + allCapsSelector)

                    //finds all elements that contain the string with the first letter capitalized
                    const allFirstletterCaps = stringToLocate.split(' ').map((word) => {
                        return word.charAt(0).toUpperCase() + word.slice(1)
                    })
                    const first_capitalized = allFirstletterCaps.join(' ')
                    const capitalSelector = ":contains('" + first_capitalized + "')"
                    const relevantElementsCapital = $('p' + capitalSelector + ',span' + capitalSelector +
                    + ',a' + capitalSelector + ',div span' + capitalSelector + ',code' + capitalSelector + ',td' + capitalSelector + ',h1' + capitalSelector 
                    + ',h2' + capitalSelector + ',h3' + capitalSelector + ',h4' 
                    + capitalSelector + ',h5' + capitalSelector + ',h6' + capitalSelector)

                    
        
                    //want to combine all relevant elements into one list
                    const combinedElements = relevantElements.add(relevantElementsCapital).add(relevantAllCaps)//.add(relevantNormalElements)
            
                    combinedElements.each((index, element) => {
                        const elementText = $(element).text();

                        //need to remove all new lines and replace with spaces
                        const cleanedText = elementText.replace(/\n/g, '')
                        const trimmedText = cleanedText.replace(/\s{2,}/g, ' ').trim()


                        textArray.push(trimmedText)
                    });

                }

                const preparedData = cleanData(textArray)
                const count = findStringMentions(preparedData, cleanListForMentions)            

                interface URLMentionObject{
                    [key: string]: any
                }

                let obj: URLMentionObject = {}
        
                mentions.push({
                    url: urlList[i],
                    mentions: preparedData,
                    rawMentions: count,
                    title: $('head').find('title').text(),
                })

                
            }
            
            return new Response(JSON.stringify(mentions))
        }
        catch(error){
            console.log(error)
            return new Response(JSON.stringify("Invalid string. Please try a different string."), {status: 500})
        }
    }

    return new Response(JSON.stringify("One or more invalid URLs."))
}

//unused patch function, could be leveraged in future updates
export async function PATCH(request: Request){
    try {
        
        const patch_data = await request.json()

        const { data, error } = await supabase
        .from('WordsAndURLs')
        .update({ words: patch_data['words'], urls: patch_data['urls']})
        .eq('user_id', patch_data['user_id'])
        .select()


        return new Response("PATCHED")

    } catch(error){
        console.log(error)
        return new Response("Error")
    }
}






