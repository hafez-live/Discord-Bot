module.exports.truncate = (String, Length) =>
{
    if (!String)
    {
        String = " ";
    }

    if (String.length > Length && String.length > 0)
    {
        let NewStr;

        NewStr = String.substr(0, Length);
        NewStr = String.substr(0, NewStr.lastIndexOf(" "));
        NewStr = NewStr.length > 0 ? NewStr : String.substr(0, Length);

        return NewStr + "...";
    }
    return String;
};
