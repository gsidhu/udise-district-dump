cd ./exports/2011/

for file in *; do 
    if [ -f "$file" ]; then 
        echo "$file"
        python ../../xlsx2csv.py "$file" "$file.csv"
    fi 
done
