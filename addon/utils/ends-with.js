export default function endsWith(str, ends) {
    return str.slice(str.length - ends.length) === ends;
}
