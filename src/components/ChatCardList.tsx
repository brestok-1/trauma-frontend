interface ChatCardListProps<T> {
   items: T[]; 
   renderItem: (item: T, index: number) => React.ReactNode;
}

function ChatCardList<T>({ items, renderItem }: ChatCardListProps<T>) {
   return (
      <div className="flex flex-wrap gap-5 justify-center md:justify-start">
         {items.map((item, index) => (
            <div
               key={index}
               className="w-[300px] md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1rem)] 3xl:w-[calc(20%-1rem)]"
            >
               {renderItem(item, index)}
            </div>
         ))}
      </div>
   );
}

export default ChatCardList;
