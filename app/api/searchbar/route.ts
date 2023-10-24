import { createClient } from "@supabase/supabase-js";
import { Console } from "console";
import * as cheerio from 'cheerio';
import { Cheerio } from "cheerio";

const supabase = createClient(
    'https://rievaasppfxgozuupggo.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpZXZhYXNwcGZ4Z296dXVwZ2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc0NjkzNDQsImV4cCI6MjAxMzA0NTM0NH0.aydvwV4Sjar8JZan0_MPJlU1pVwfAq9sHqdBv-C1bps'
)

function isValidUrl(url: string) {
    // Regular expression for a basic URL pattern
    var urlPattern = /^(https?:\/\/)?([\w.]+)\.([a-z]{2,})(\/?\w*\/?)*(\?\w+=\w+(&\w+=\w+)*)?$/i;
    
    // Test the provided URL against the pattern
    return urlPattern.test(url);
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

        //console.log(data)

        return new Response(JSON.stringify( {message: 'hey'}))

    } catch(error){
        console.log(error)
        return new Response("Error")
    }

}

export async function GET(request: Request){

    const { searchParams } = new URL(request.url)
    const words = searchParams.get('words')
    const urls = searchParams.get('urls')

    const allowParsing = isValidUrl(urls? urls : "notValid")

    if (allowParsing){
        const parsing_page = await fetch(urls? urls : '')
        const html = await parsing_page.text()
        const $ = cheerio.load(html)
        //const regex = new RegExp(words? words : '', 'gi');

        const mentionedElements = $('*').find(':contains("' + words + '")')
        const textArray: string[] = []
    
        mentionedElements.each(function() {
            const elementText = $(this).text();

            const cleanedText = elementText.replace(/\n/g, '')
            const trimmedText = cleanedText.replace(/\s{2,}/g, ' ').trim()

            textArray.push(trimmedText)
        });  

        let cleanArray: string[] = []; 
        textArray.forEach(element => { 
            if (!cleanArray.includes(element)) { 
                cleanArray.push(element); 
            } 
        }); 
        
        return new Response(JSON.stringify(cleanArray))
    }

    return new Response(JSON.stringify("ouch"))
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






