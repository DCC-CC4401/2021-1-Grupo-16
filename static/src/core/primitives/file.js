/**
 FILE
 Utility file management functions.

 */
"use strict";

/**
 * Get file extension.
 *
 * @this {File}
 * @param {string} $filename - Filename
 * @returns {string} - File extension
 */
File.getExtension = function ($filename) {

    return $filename.match(/\.([0-9a-z]+)(?=[?#])|(\.)[\w]+$/gmi)[0];

};

/**
 * Return size of a given file.
 *
 * @this {File}
 * @param {string} $src - File source
 * @returns {number}
 */
File.getFileSize = function ($src) {

    let $request = new XMLHttpRequest();
    $request.open('HEAD', $src, false);
    $request.send(null);
    let $headerText = $request.getAllResponseHeaders();
    let $re = /Content-Length\s*:\s*(\d+)/i;
    $re.exec($headerText);
    return parseInt(RegExp.$1, 10);

};

/**
 * Returns file icon extension.
 *
 * @this {File}
 * @param {string} $extension - File extension
 * @param {boolean=} $bold - Icon in bold
 * @returns {string} - Icon
 */
File.getIcon = function ($extension, $bold) {
    /* eslint-disable array-element-newline */

    // Parse query and find extension
    $extension = $extension.toUpperCase();
    if ($extension.charAt(0) === '.') $extension = $extension.substring(1);
    let $icon;
    let $fab = false;

    // Image
    if (File.isImageExtension($extension)) {
        $icon = 'fa-file-image';
    }

    // Excel
    else if (['XLS', 'XLSX', 'CSV', 'XPS', 'ODS', 'TSV', 'SXC'].indexOf($extension) !== -1) {
        $icon = 'fa-file-excel';
    }

    // Word
    else if (['DOC', 'DOCX', 'ODT', 'RTF', 'UPD'].indexOf($extension) !== -1) {
        $icon = 'fa-file-word';
    }

    // Powerpoint
    else if (['PPT', 'PPTX'].indexOf($extension) !== -1) {
        $icon = 'fa-file-powerpoint';
    }

    // Compressed file
    else if (['ZIP', 'RAR', 'RAR4', 'GZ', 'SBX', 'MAR', 'LBR', 'SHAR', 'CPIO', 'A', 'AR', 'BZ', 'F', 'LZ', 'LZMA', 'LZO', 'RZ', 'SFARK', 'SZ', 'XZ', 'Z', '7Z', 'S7Z', 'ACE', 'AFA', 'ALZ', 'ARC', 'ARJ'].indexOf($extension) !== -1) {
        $icon = 'fa-file-archive';
    }

    // Text file
    else if (['TXT', 'MD', 'TEX', 'CFG', 'DAT', 'DATA'].indexOf($extension) !== -1) {
        $icon = 'fa-file-alt';
    }

    // PDF file
    else if ($extension === 'PDF') {
        $icon = 'fa-file-pdf';
    }

    // Audio file
    else if (['MP3', 'MP4A', 'AAC', 'OGA', 'FLAC'].indexOf($extension) !== -1) {
        $icon = 'fa-file-audio';
    }

    // Video file
    else if (['WEBM', 'MPG', 'MP2', 'MPEG', 'MPE', 'MPV', 'OGG', 'MP4', 'M4P', 'M4V'].indexOf($extension) !== -1) {
        $icon = 'fa-file-video';
    }

    // Source code
    else if (['XML', 'HTML', 'JS', 'PHP', 'JSON', 'JAR', 'JAVA', 'CLASS', 'PY', 'C', 'CPP', 'LESS', 'SCSS', 'SQL', 'H', 'PYC'].indexOf($extension) !== -1) {
        $icon = 'fa-file-code';
    }

    // Disc image
    else if ($extension === 'ISO') {
        $bold = true;
        $icon = 'fa-compact-disc';
    }

    // Executable
    else if (['EXE', 'SH', 'BIN', 'APP', 'JAR'].indexOf($extension) !== -1) {
        $bold = true;
        $icon = 'fa-cogs';
    }

    // Installers
    else if (['MSI'].indexOf($extension) !== -1) {
        $bold = true;
        $icon = 'fa-box';
    }

    // Android
    else if (['APK'].indexOf($extension) !== -1) {
        $fab = true;
        $icon = 'fa-android';
    }

    // Unknown
    else {
        $icon = 'fa-file';
    }

    // Apply style to the icon
    if ($fab) {
        $icon = 'fab ' + $icon;
    } else {
        if ($bold) $icon = 'fas ' + $icon;
        else $icon = 'far ' + $icon;
    }

    // Returns fontawesome icon
    return '<i class="{0}"></i>'.format($icon);

};

/**
 * Check if file extension is from a file.
 *
 * @param {string} $extension - File extension
 * @returns {boolean} - File is an image
 */
File.isImageExtension = function ($extension) {

    return ['PNG', 'JPG', 'JPEG', 'GIF', 'TIF', 'ICO', 'TIFF', 'BMP', 'JPG', 'EPS', 'RAW', 'CR2', 'NEF', 'PCX', 'TGA', 'YUV', '3FR', 'ABR', 'AI', 'ANI', 'APX', 'AVW', 'BAY', 'BIP', 'BLP', 'BPG', 'IMG'].indexOf($extension.toUpperCase().replace('.', '')) !== -1;

};

/**
 * Checks if file has an image extension.
 *
 * @param {string} $file - File
 * @returns {boolean} - File is an image
 */
File.isFileImageExtension = function ($file) {
    let $img_extension = $file.split('.');
    $img_extension = $img_extension[$img_extension.length - 1];
    return File.isImageExtension($img_extension);
}