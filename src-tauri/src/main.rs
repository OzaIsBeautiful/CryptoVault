// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use std::io::Read;
use std::path::Path;
use ring::digest;
use data_encoding::HEXLOWER;

// Fonction pour calculer le hachage d'un fichier
#[tauri::command]
fn hash_file(path: String, algorithm: String) -> Result<String, String> {
    let path = Path::new(&path);
    
    // Vérifier si le fichier existe
    if !path.exists() {
        return Err("Le fichier n'existe pas".to_string());
    }
    
    // Ouvrir le fichier
    let mut file = match fs::File::open(path) {
        Ok(f) => f,
        Err(e) => return Err(format!("Erreur lors de l'ouverture du fichier: {}", e)),
    };
    
    // Lire le contenu du fichier
    let mut buffer = Vec::new();
    if let Err(e) = file.read_to_end(&mut buffer) {
        return Err(format!("Erreur lors de la lecture du fichier: {}", e));
    }
    
    // Calculer le hachage selon l'algorithme choisi
    let hash = match algorithm.as_str() {
        "sha256" => {
            let digest = digest::digest(&digest::SHA256, &buffer);
            HEXLOWER.encode(digest.as_ref())
        },
        "sha512" => {
            let digest = digest::digest(&digest::SHA512, &buffer);
            HEXLOWER.encode(digest.as_ref())
        },
        _ => return Err("Algorithme non supporté".to_string()),
    };
    
    Ok(hash)
}

// Fonction pour enregistrer du contenu dans un fichier
#[tauri::command]
fn save_to_file(path: String, content: String) -> Result<(), String> {
    match fs::write(path, content) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Erreur lors de l'écriture du fichier: {}", e)),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            hash_file,
            save_to_file
        ])
        .run(tauri::generate_context!())
        .expect("Erreur lors de l'exécution de l'application");
}
