import { createClient } from "@supabase/supabase-js";
import { Console } from "console";
import * as cheerio from 'cheerio';
import validator from "validator";

const supabase = createClient(
    'https://rievaasppfxgozuupggo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZXZhYXNwcGZ4Z296dXVwZ2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0NjkzNDQsImV4cCI6MjAxMzA0NTM0NH0.aydvwV4Sjar8JZan0_MPJlU1pVwfAq9sHqdBv-C1bps'
)


function removeLongStrings(inputArray: string[]) {
    return inputArray.filter(string => string.length <= 400);
}

function removeDuplicates(dirtyData: string[]){
    const cleanArray: string[] = []
    dirtyData.forEach(element => { 
        if (!cleanArray.includes(element)) { 
            cleanArray.push(element); 
        } 
    }); 

    return cleanArray
    
}

//write a function that compares string elements inside an array
//if the string elements contain an identical substring, remove the longer string
function removeSimilarElements(dirtyData: string[]){
    const cleanArray: string[] = []

    dirtyData.forEach(element => {
        let isSimilar = false
        for (let i = 0; i < cleanArray.length; i++){
            if (cleanArray[i].includes(element)){
                isSimilar = true
            }
        }
        if (!isSimilar){
            cleanArray.push(element)
        }
    })

    return cleanArray
}

function cleanData(dirtyData: string[]){
    
    const cleanData = dirtyData? removeDuplicates(dirtyData) : []

    const finalArray = removeLongStrings(cleanData? cleanData : [])

    return finalArray

}

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

export async function GET(request: Request){

    const { searchParams } = new URL(request.url)
    const words = searchParams.get('words')
    const urls = searchParams.get('urls')

    const urlList = urls? urls.split('--') : []
    const wordList = words? words.split('-') : []

    let allowParsing = true
    for (let i = 0; i < urlList.length; i++){
        allowParsing = validator.isURL(urlList[i])
    }
    
    if (allowParsing){
        
        const mentions = []

        for (let i = 0; i < urlList.length; i++){
            const parsing_page = await fetch(urlList? urlList[i] : '')
            const html = await parsing_page.text()
            const $ = cheerio.load(html)

            const textArray: string[] = []

            for (let j = 0; j < wordList.length; j++){

                //need to make this mentionedElement line case insensitive
                const mentionedElements = $('*').find(':contains("' + wordList[j] + '")')

                const capitalized = wordList[j].charAt(0).toUpperCase() + wordList[j].slice(1)
                const mentionedElements2 = $('*').find(':contains("' + capitalized + '")')

                //want to combine mentionedElements1 with mentionedElements2
                const combinedElements = mentionedElements.add(mentionedElements2)
            
                combinedElements.each((index, element: cheerio.Element) => {
                    const elementText = $(element).text();

                    //need to remove all new lines and replace with spaces
                    const cleanedText = elementText.replace(/\n/g, '')
                    const trimmedText = cleanedText.replace(/\s{2,}/g, ' ').trim()


                    textArray.push(trimmedText)
                });


            }

            const rawData = cleanData(textArray)
            const refinedData = removeSimilarElements(rawData)

            let count = 0

            refinedData.forEach((string) => {

                const stringArray = string.split(' ')
                
                for (let j = 0; j < stringArray.length; j++){
                    for (let i = 0; i < wordList.length; i++){
                        if (stringArray[j].toLowerCase().includes(wordList[i].toLowerCase())){
                            count += 1
                        }
                    }
                }
            }
            );

            interface URLMentionObject{
                [key: string]: any
            }

            let obj: URLMentionObject = {}
    
            mentions.push({
                url: urlList[i],
                mentions: refinedData,
                rawMentions: count
            })

            
        }
        
        return new Response(JSON.stringify(mentions))
    }

    return new Response(JSON.stringify("One or more invalid URLs."))
}

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






